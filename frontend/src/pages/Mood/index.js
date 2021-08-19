import React, { useEffect, useState } from 'react'
import { Container, Grid, Segment, Card, Image, Button, Message, Progress, Table } from 'semantic-ui-react';
import Header from "../../components/Header";
import styled from 'styled-components';
import Dropzone from 'react-dropzone';
import axios from 'axios';
import FormData from 'form-data';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngry, faSadTear, faSurprise, faMeh, faDizzy, faSmile } from '@fortawesome/free-solid-svg-icons'

export default function Mood() {
    const initialEmotions = [
        { type: "HAPPY", confidence: 0 },
        { type: "ANGRY", confidence: 0 },
        { type: "SURPRISED", confidence: 0 },
        { type: "CALM", confidence: 0 },
        { type: "FEAR", confidence: 0 },
        { type: "SAD", confidence: 0 }

    ]
    const [file, setFiles] = useState([]);
    const [fileAccepted, setFileAccepted] = useState(false);
    const [base64Image, setBase64Image] = useState("");
    const [imageErrorMessage, setImageErrorMessage] = useState("")
    const [emotions, setEmotions] = useState(initialEmotions)
    const [mood, setMood] = useState("UNKNOWN")

    useEffect(() => {
        let reader = new FileReader();
        setFileAccepted(false);
        if (file.path !== undefined)
            if (file.path.endsWith(".png") || file.path.endsWith(".jpg") || file.path.endsWith(".jpeg")) {
                setFileAccepted(true);
                setImageErrorMessage("");
                setMood("UNKNOWN")
                reader.readAsDataURL(file);
                reader.onload = () => {
                    setBase64Image(reader.result);
                }
            }
    }, [file])

    useEffect(() => {
        if (emotions.some(emotion => emotion.confidence !== 0))
            setMood(emotions.find(emotion => emotion.confidence === Math.max.apply(Math, emotions.map(function (o) { return o.confidence; }))).type);
    }, [emotions])

    const onClickHandler = () => {
        const requestUrl = '/api/rekognition/emotions';
        const image = new FormData();
        image.append('image', file, file.name);
        axios({
            method: 'POST',
            url: requestUrl,
            data: image,
            headers: {
                authorization: 'Basic dXNlcjptb3ZpZXJhdGlvbg==',
                'Content-Type': `multipart/form-data; boundary=${image._boundary}`
            },

        }).then(response => {
            if (response.status === 200) {
                const data = response.data.filter(emotion => emotion.type !== "DISGUSTED" && emotion.type !== "CONFUSED")
                setEmotions(data);
            }
        }).catch(error => {
            setImageErrorMessage(error.response?.data);
            setMood("UNKNOWN")
            setFileAccepted(false);
        });
    }

    return (
        <MoodDiv>

            <Header></Header>
            <Container style={{ marginTop: '3em' }}>
                <Segment padded='very' color='red'>
                    <Grid>

                        <Container >
                            <Grid stackable>
                                <Grid.Column width="5">
                                    <Card  >
                                        <Dropzone onDrop={acceptedFiles => setFiles(acceptedFiles[0])}>
                                            {({ getRootProps, getInputProps }) => (

                                                <section>
                                                    <div {...getRootProps()}>
                                                        <Segment color={fileAccepted ? "green" : "red"}>
                                                            <input {...getInputProps()} />
                                                            {
                                                                base64Image === "" ?
                                                                    <Image src='/assets/images/square-image.png' width="200" centered /> :
                                                                    <Image src={base64Image} width="200" centered />
                                                            }
                                                        </Segment>
                                                    </div>
                                                </section>

                                            )}
                                        </Dropzone>
                                        <Container textAlign="center">{imageErrorMessage}</Container>
                                        <Card.Content>
                                            <Segment color='red'>
                                                Please upload your photo for movie suggestion according to your mode!
                                            </Segment>

                                            <Container textAlign="center">
                                                <Button color='red' disabled={fileAccepted ? false : true} onClick={onClickHandler}>
                                                    Upload!
                                                </Button>

                                            </Container>

                                        </Card.Content>
                                    </Card>
                                </Grid.Column>

                                <Grid.Column width="11">
                                    <Table celled size="small" stackable>
                                        <Table.Body>
                                            {emotions.map(emotion => (
                                                <Table.Row>
                                                    <Table.Cell width="4">
                                                        <h5>
                                                            <FontAwesomeIcon
                                                                icon={
                                                                    emotion.type === 'HAPPY' ? faSmile :
                                                                        emotion.type === 'SAD' ? faSadTear :
                                                                            emotion.type === 'ANGRY' ? faAngry :
                                                                                emotion.type === 'CALM' ? faMeh :
                                                                                    emotion.type === 'FEAR' ? faDizzy :
                                                                                        emotion.type === 'SURPRISED' ? faSurprise : null


                                                                }
                                                                size="lg"
                                                                color="grey"
                                                            />
                                                            {emotion.type}
                                                        </h5>
                                                    </Table.Cell>
                                                    <Table.Cell width="12">
                                                        <Progress
                                                            size='small'
                                                            percent={emotion.confidence}

                                                            color={
                                                                emotion.type === 'HAPPY' ? "green" :
                                                                    emotion.type === 'SAD' ? "brown" :
                                                                        emotion.type === 'ANGRY' ? "red" :
                                                                            emotion.type === 'CALM' ? "blue" :
                                                                                emotion.type === 'FEAR' ? "grey" :
                                                                                    emotion.type === 'SURPRISED' ? "purple" : "olive"
                                                            }
                                                        >%{emotion.confidence.toFixed(2)}</Progress>
                                                    </Table.Cell>
                                                </Table.Row>
                                            ))}

                                        </Table.Body>
                                    </Table>
                                    <Segment color='red'>
                                        <Container textAlign="center">
                                            <Message compact >
                                                <Message.Header>Your mood is {mood}!
                                                </Message.Header>
                                                {mood === 'UNKNOWN' ? null :
                                                    <p>
                                                        According to your mode,
                                                        to see movie recommendations click <Link to=
                                                            {
                                                                mood === 'HAPPY' ? `/mood/1` :
                                                                    mood === 'SAD' ? `/mood/2` :
                                                                        mood === 'ANGRY' ? `/mood/3` :
                                                                            mood === 'SURPRISED' ? `/mood/4` :
                                                                                mood === 'CALM' ? "/mood/5" :
                                                                                    mood === 'FEAR' ? "/mood/6" : "/"

                                                            }>here</Link>.
                                                    </p>
                                                }
                                            </Message>
                                        </Container>
                                    </Segment>
                                </Grid.Column>
                            </Grid>


                        </Container>
                    </Grid>
                </Segment>
            </Container>
        </MoodDiv >
    )
}

const MoodDiv = styled.div`
    height: 100vh;
`;
