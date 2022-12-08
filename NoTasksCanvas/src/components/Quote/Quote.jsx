import React, { Component } from 'react';
import { withTheme, styled } from '@twilio/flex-ui';

import {
    QuoteComponentStyled, HeaderLine, Header, QuoteBody, QuoteAuthor
} from './Quote.Styles';
import FrontlineApi from 'twilio/lib/rest/FrontlineApi';

const url = `https://api.quotable.io/random?tags=life`;

class QuoteComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            quote:null,
            author:null,
            loaded:false,
            error:null
        };
    }

    componentDidMount() {
        fetch(url)
            .then((resp) => resp.json())
            .then((json) => {
                this.setState({
                    quote:json.content,
                    author:json.author,
                    loaded:true
                });
            })
            .catch((err) => this.setState({ err, loaded: true }));
    }

    render() {
        const { quote, author, err, loaded } = this.state;
        let value = quote;

        if (err) {
            console.error(err);
            value = `Error: ${err}`;
        }
        if (!loaded) {
            value = 'Loading...';
        }

        return (
            <QuoteComponentStyled>
                <HeaderLine>
                    <Header>Quote of the Day</Header>
                </HeaderLine>
                <QuoteBody>{value}</QuoteBody>
                <QuoteAuthor>{author ? author : ''}</QuoteAuthor>
            </QuoteComponentStyled>
        )
    }
}

export default withTheme(QuoteComponent);