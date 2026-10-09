import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { util, z } from 'zod';

const router = Router();
const prisma = new PrismaClient();

// Validation schema for ZIP codes
const zipSchema = /^\d{5}$/

/**
 * GET /api/utilities/:userInput
 */
router.get('/:userInput', async (req, res) => {
    try {
        // Validate Input
        const rawInput = req.params.userInput.trim();

        const isZipCode = zipSchema.test(rawInput);

        let condition: any;
        if (isZipCode) {
            condition = { zip: rawInput };
        } else {
            condition = {
                place: {
                    city: {
                        contains: rawInput,
                        mode: 'insensitive' as const,
                    },
                },
            };
        }

        const offerings = await prisma.offering.findMany({
            where: condition,
            include: {
                provider: true,
                place: true,
            },
        });

        if (!offerings.length) {
            return res.status(404).json({ 
                message: isZipCode
                ? 'No utilities for this ZIP Code'
                : 'No utilities for this city'
            });
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
        })

    } catch (error) {
        if (error instanceof z.ZodError) {
            const zodError = error as z.ZodError<any>;
            return res.status(400).json({ error: zodError.issues[0].message });
        }
        console.error('Error fetching utilities:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

export default router;