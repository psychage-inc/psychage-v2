import React from 'react';
import { Article } from '../../types/models';
import { categories } from '../categories';

const getCat = (id: string) => categories.find(c => c.id === id) || categories[0];

export const articles: Article[] = [
    {
        id: '1',
        slug: "understanding-anxiety-guide",
        title: "Entendiendo la Ansiedad: Una Guía Completa",
        description: "Aprenda sobre los síntomas de la ansiedad, sus causas y estrategias de afrontamiento basadas en evidencia.",
        image: "/images/articles/cover-anxiety.svg",
        category: getCat('anxiety'),
        readTime: 8,
        publishedAt: "2025-01-15",
        author: {
            id: "sarah-chen",
            name: "Dra. Sarah Chen",
            role: "Terapeuta Licenciada",
            image: "/images/authors/author-female-1.svg"
        },
        reviewedBy: {
            id: "clinical-board",
            name: "Junta de Revisión Clínica",
            role: "Revisión Médica",
            image: "/images/authors/author-team.svg"
        },
        tags: ["Salud Mental", "Ansiedad", "Bienestar", "Terapia"],
        citations: [],
        content: (
            <>
                <div id="what-is-anxiety" className="scroll-mt-32">
                    <p className="lead text-xl text-gray-600 mb-8 leading-relaxed">
                        La ansiedad es más que solo sentirse estresado o preocupado. Es una respuesta natural del cuerpo diseñada para mantenernos a salvo.
                    </p>
                </div>
                {/* More content would go here */}
            </>
        )
    }
];
