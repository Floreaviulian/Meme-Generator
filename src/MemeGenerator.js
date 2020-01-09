import React, { useState, useEffect } from 'react'

import { useFormInput } from './hooks'

export default () => {
    let [topText, setTopText, inpTopText] = useFormInput('')
    let [bottomText, setBottomText, inpBottomText] = useFormInput('')

    let [randomImg, setRandomImg] = useState('http://i.imgflip.com/1bij.jpg')
    let [allMemeImgs, setAllMemeImgs] = useState([])

    useEffect(() => {
        fetch('https://api.imgflip.com/get_memes')
            .then(response => response.json())
            .then(({ data }) => {
                setAllMemeImgs(data.memes)
            })
    }, [])

    const handleSubmit = event => {
        event.preventDefault()
        const randNum = Math.floor(Math.random() * allMemeImgs.length)
        setRandomImg(allMemeImgs[randNum].url)
    }

    return (
        <div>
            <form className="meme-form" onSubmit={handleSubmit}>
                <input placeholder="Top Text" {...inpTopText} />
                <input placeholder="Bottom Text" {...inpBottomText} />

                <button>Gen</button>
            </form>
            <div className="meme">
                <img src={randomImg} alt="" />
                <h2 className="top">{topText}</h2>
                <h2 className="bottom">{bottomText}</h2>
            </div>
        </div>
    )
}
