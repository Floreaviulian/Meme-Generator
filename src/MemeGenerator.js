import React, { useState, useEffect } from 'react'

import { useFormInput } from './hooks'

export default () => {
    let [topText, setTopText, inpTopText] = useFormInput('')
    let [bottomText, setBottomText, inpBottomText] = useFormInput('')

    let [randomImg, setRandomImg] = useState('http://i.imgflip.com/1bij.jpg')
    let [allMemeImgs, setAllMemeImgs] = useState([])
    let [uploadedFiles, setUploadedFiles] = useState(null);

        useEffect(() => {
        fetch('https://api.imgflip.com/get_memes')
            .then(response => response.json())
            .then(({ data }) => {
                setAllMemeImgs(data.memes)
            })
    }, [])
    const setCanvasImage = (url) => {
        const canvas = document.getElementById('canvas');
            const ctx = canvas.getContext('2d');
            const img = new Image();
            img.onload = function(){
                canvas.setAttribute('width', this.naturalWidth > window.innerWidth ? window.innerWidth : this.naturalWidth);
                canvas.setAttribute('height', this.naturalHeight > window.innerHeight ? window.innerHeight : this.naturalHeight);
                ctx.drawImage(img, 0, 0, this.naturalWidth > window.innerWidth ? window.innerWidth : this.naturalWidth, this.naturalHeight > window.innerHeight ? window.innerHeight : this.naturalHeight);
                
            }
            img.src = url
    };
    const handleSubmit = event => {
        event.preventDefault()
        const randNum = Math.floor(Math.random() * allMemeImgs.length)
        setRandomImg(allMemeImgs[randNum].url)
        setCanvasImage(allMemeImgs[randNum].url);
    }
    const handleImage = event => {
        console.log(event.target.files[0]);
        let file = event.target.files[0];
        if (file) {
            setUploadedFiles(file);
        var reader = new FileReader();
        var url = reader.readAsDataURL(file);

        reader.onloadend = function (e) {
            setRandomImg(reader.result);
            setCanvasImage(reader.result);
        };
        }
        
      
    }
    
    return (
        <div>
            <form className="meme-form" onSubmit={handleSubmit}>
                <input placeholder="Top Text" {...inpTopText} />
                <input placeholder="Bottom Text" {...inpBottomText} />

                <button>Gen</button>
            </form>
            <input id="fileInput" name="fileInput" type="file" accept=".jpg, .jpeg, .png" onChange={handleImage} />
            <div className="meme">
               <canvas id="canvas"></canvas>
                <h2 className="top">{topText}</h2>
                <h2 className="bottom">{bottomText}</h2>
            </div>
            <a href={randomImg} download>Download</a>
        </div>
    )
}
