import React from 'react'; 
import { Timeline } from 'primereact/timeline';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faServer, faDesktop, faCode, faFile, faPlay } from '@fortawesome/free-solid-svg-icons';

export default function TemplateDemo({ navigate }) {
    const events = [
        { 
            status: 'PostgreSQL', 
            date: '2023-01-01', 
            icon: faBook, 
            color: '#9C27B0', 
            description: 'Lärande i arbete där teoretiska kunskaper tillämpas i praktiska situationer.',
            image: 'https://gratisography.com/wp-content/uploads/2024/11/gratisography-augmented-reality-800x525.jpg' 
        },
        { 
            status: 'Express.js', 
            date: '2023-03-01', 
            icon: faServer, 
            color: '#673AB7', 
            description: 'Utveckling av serverlösningar och databashantering.',
            image: '' 
        }, 
        { 
            status: 'React', 
            date: '2023-06-01', 
            icon: faDesktop, 
            color: '#FF9800', 
            description: 'Lärande av React för att bygga användargränssnitt.',
            image: 'https://via.placeholder.com/150' 
        },
        { 
            status: 'Javascript', 
            date: '2024-10-14', 
            icon: faCode, 
            color: '#607D8B', 
            description: 'Fördjupning i Javascript-programmering.',
            image: 'https://via.placeholder.com/150' 
        }, 
        { 
            status: 'HTML & CSS', 
            date: '2024-09-01', 
            icon: faFile, 
            color: '#3F51B5', 
            description: 'Grunderna i HTML och CSS för webbutveckling.',
            image: 'https://via.placeholder.com/150' 
        }, 
        { 
            status: 'Start', 
            date: '2024-09-01', 
            icon: faPlay, 
            color: '#4CAF50', 
            description: 'Start av utbildning.',
            image: 'https://via.placeholder.com/150' 
        } 
    ];

    const customizedMarker = (item) => {
        return (
            <span className="flex w-2rem h-2rem align-items-center justify-content-center text-white border-circle z-1 shadow-1" style={{ backgroundColor: item.color }}>
                <FontAwesomeIcon icon={item.icon} />
            </span>
        );
    };

    const customizedContent = (item) => {
        return (
            <Card title={item.status} subTitle={item.date}>
                <img src={item.image} alt={item.status} className="w-full h-auto rounded mb-2" /> 
                <p>{item.description}</p>
                <Button 
                    label="Se våra projekt" 
                    className="p-button-text" 
                    onClick={() => navigate('/projects')} 
                />
            </Card>
        );
    };
        
    return (
        <div className="card">
            <h2 className="text-2xl font-bold text-center my-4">Vår Resa</h2> {/* Titel */}
            <p className="text-center mb-6">En översikt av vår utvecklingsresa och viktiga milstolpar.</p> {/* Beskrivning */}
            <Timeline value={events} align="alternate" className="customized-timeline" marker={customizedMarker} content={customizedContent} />
        </div>
    );
}