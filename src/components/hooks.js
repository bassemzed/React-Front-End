import React, {useEffect, useState} from 'react'

export const useFetchPost = (url, initialValue,data) =>{
    const [result, setResult] = useState(initialValue);

    useEffect(()=>{
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        };

        fetch(url,requestOptions)
        .then(response => response.json())
        .then(json => setResult(json))
    },[]);

    return result
}

export const useFetch = (url, initialValue) =>{
    const [result, setResult] = useState(initialValue);

    useEffect(()=>{
        fetch(url)
        .then(response => response.json())
        .then(json => setResult(json))
    },[]);

    return result
}
