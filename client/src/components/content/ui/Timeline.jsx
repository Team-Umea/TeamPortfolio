import React from 'react'; 
import { Timeline } from 'primereact/timeline';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faServer, faDesktop, faCode, faFile, faPlay } from '@fortawesome/free-solid-svg-icons';

export default function TemplateDemo() {
    const events = [
        { 
            status: 'LIA', 
            date: '2023-01-01', 
            icon: faBook, 
            color: '#9C27B0', 
            description: 'Lärande i arbete där teoretiska kunskaper tillämpas i praktiska situationer. Under LIA får studenterna möjlighet att arbeta i verkliga projekt och få feedback från yrkesverksamma.',
            image: 'https://gratisography.com/wp-content/uploads/2024/11/gratisography-augmented-reality-800x525.jpg' // Exempelbild
        },
        { 
            status: 'Backend', 
            date: '2023-03-01', 
            icon: faServer, 
            color: '#673AB7', 
            description: 'Utveckling av serverlösningar och databashantering. Här lär sig studenterna om API:er, databaser och hur man bygger skalbara lösningar för att hantera användardata.',
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIm_JmCQQOBv01H6mqhkLTarmNYycF962P3A&s' 
        }, 
        { 
            status: 'React', 
            date: '2023-06-01', 
            icon: faDesktop, 
            color: '#FF9800', 
            description: 'Lärande av React för att bygga användargränssnitt. Fokus ligger på komponentbaserad utveckling och hur man skapar dynamiska, responsiva applikationer med hjälp av React-biblioteket.',
            image: 'https://via.placeholder.com/150' // Exempelbild
        },
        { 
            status: 'Javascript', 
            date: '2024-10-14', 
            icon: faCode, 
            color: '#607D8B', 
            description: 'Fördjupning i Javascript-programmering. Studenterna lär sig avancerade koncept som asynkron programmering, funktionell programmering och hur man använder Javascript för att manipulera DOM.',
            image: 'https://via.placeholder.com/150' // Exempelbild
        }, 
        { 
            status: 'HTML & CSS', 
            date: '2024-09-01', 
            icon: faFile, 
            color: '#3F51B5', 
            description: 'Grunderna i HTML och CSS för webbutveckling. Här får studenterna en solid förståelse för hur man strukturerar webbsidor och stilar dem för att skapa attraktiva användarupplevelser.',
            image: 'https://via.placeholder.com/150' // Exempelbild
        }, 
        { 
            status: 'Start', 
            date: '2024-09-01', 
            icon: faPlay, 
            color: '#4CAF50', 
            description: 'Start av ett nytt projekt där studenterna får tillämpa sina kunskaper i en praktisk miljö. Detta steg markerar början på en ny lärandeupplevelse och utmaning.',
            image: 'https://via.placeholder.com/150' // Exempelbild
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
                <Button label="Se våra projekt" className="p-button-text"></Button>
            </Card>
        );
    };
        
    return (
        <div className="card">
            <Timeline value={events} align="alternate" className="customized-timeline" marker={customizedMarker} content={customizedContent} />
        </div>
    );
}