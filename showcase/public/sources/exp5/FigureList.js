import React, { useState } from 'react';
import './App.css';
const BasicFigure = ({ image, caption, onRemove }) => {
    return (
        <div className='basic-figure'>
            <img src={image} alt={caption} className='figure-image'></img>
            <figcaption className='remove-button' onClick={onRemove}>Remove</figcaption>
        </div>

    );
}

const FigureList = () => {
    const [figures, setFigures] = useState([
        {
            id: 1,
            image: "https://via.placeholder.com/150",
            caption: "Natural Image 1",
        },
        {
            id: 2,
            image: "https://via.placeholder.com/150",
            caption: "Natural Image 2",
        },
    ]);

    const [newImage, setNewImage] = useState('');
    const [newCaption, setNewCaption] = useState('');
    const addfigure = () => {
        if (newImage && newCaption) {
            setFigures([...figures,
            {
                id: Date.now(),
                image: newImage,
                caption: newCaption,
            }
            ])
                setNewImage('');
    setNewCaption('');
        }
    }


    const removeFigure = (id) => {
        setFigures(figures.filter((figure) => figure.id !== id));
    };

    return (
        <div className='figure-list'>
            <div className='form'>
                <input type="text" placeholder='Image-url' value={newImage} onChange={(e) => setNewImage(e.target.value)}></input>
                <input type="text" placeholder='Caption' value={newCaption} onChange={(e) => setNewCaption(e.target.value)}></input>
                <button onClick={addfigure}>Add a Image</button>

            </div>
            <div className='grid'>
                {figures.map((figure) => (
                    <BasicFigure
                        key={figure.id}
                        image={figure.image}
                        caption={figure.caption}
                        onRemove={()=>removeFigure(figure.id)}
                    />
                ))}
            </div>
        </div>

    );
}
export default FigureList;