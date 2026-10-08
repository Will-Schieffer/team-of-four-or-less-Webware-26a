import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

const router = Router();
const prisma = new PrismaClient();

// Validation schema for ZIP codes
const zipSchema = z.string().regex(/^\d{5}$/, "Must be a valid 5-digit ZIP code");

/**
 * GET /api/utilities/:zip
 * Retrieves all utility offerings for a specific ZIP code.
 * This is public, but rate-limited globally.
 */
router.get('/:zip', async (req, res) => {
    try {
        // Validate Input
        const zip = zipSchema.parse(req.params.zip);

        // query Prisma
        const offerings = await prisma.offering.findMany({
            where: { zip },
            include: {
                provider: true,
                place: true,
            },
        });

        if (!offerings.length) {
            return res.status(404).json({ message: 'No utilities found for this ZIP code.' });
        }


        const groupedOfferings = offerings.reduce((acc: { [x: string]: any[]; }, offering: { category: any; }) => {
            const { category } = offering;
            if (!acc[category]) acc[category] = [];
            acc[category].push(offering);
            return acc;
        }, {} as Record<string, typeof offerings>);

        res.json({
            place: offerings[0].place,
            utilities: groupedOfferings
        });

    } catch (error) {
        if (error instanceof z.ZodError) {
            const zodError = error as z.ZodError<any>;
            return res.status(400).json({ error: zodError.issues[0].message });
        }
        console.error('Error fetching utilities:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

/**
 * GET /api/utilities/search/city
 * Allows searching by city/state if the user doesn't know their ZIP.
 */
router.get('/search/city', async (req, res) => {
    try {
        const cityQuery = z.string().min(2).parse(req.query.q);

        const places = await prisma.place.findMany({
            where: {
                city: {
                    contains: cityQuery,
                    mode: 'insensitive',
                }
            },
            take: 10,
        });

        res.json(places);
    } catch (error) {
        res.status(400).json({ error: 'Invalid search query' });
    }
});

export default router;