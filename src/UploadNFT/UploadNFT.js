import React, { useState } from 'react';


export default function UploadNFT() {
  const [image, setImage] = useState({});
  const [state, setState] = useState(null);

  const getImage = async (info) => {
    try {
      const registerResponse = await fetch('', {
        method: 'POST',
        credentials: 'include',
        body: info,
        headers: {
          'encType': 'multipart/form-data'
        }
      })

      const parsedResponse = await registerResponse.json()
      setState({
        ...parsedResponse.data
      })

      return parsedResponse
    } catch (err) {
      console.log(err)
    }
  }


  handleChange = (e) => {
    if (e.target.name !== 'image') {
      setImage({ [e.target.name]: e.target.value });
    } else {
      // file upload
      console.log(e.target.files[0])
      setImage({ image: e.target.files[0] });
    }
  }

  handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();

    data.append('file', image);

    console.log(data.entries(), ' this is data')
    for (let pair of data.entries()) {
      console.log(pair[0], ', ', pair[1])
    }

    const registerCall = getImage(data);

    registerCall.then((data) => {
      console.log(data, '<-- this is my data response in Image Upload')
      if (data.status.message === "Success") {
        this.props.history.push('/s3-Bucket')
      } else {
        console.log(data, ' this should have an error message? How could you display that on the screen')
      }
    })
  }

  return (
    <div>
      <h1>File Upload Test</h1>

      <form action="/posts" method="POST" enctype="multipart/form-data">
        <input type="file" name="image" accept="image/*"/>
        <input type="text" name="caption" placeholder="Caption"/>
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}