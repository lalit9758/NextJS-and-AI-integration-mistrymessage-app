import React from 'react';
import { Html, Head, Body, Container, Heading, Text, Button } from '@react-email/components';

interface VerificationEmailProps{
  username: string;
  otp: string;
}
export default function VerificationEmail({ username, otp } : VerificationEmailProps){
  return (
    <Html>
      <Head />
      <Body style={mainStyle}>
        <Container style={containerStyle}>
          <Heading style={headingStyle}>Your OTP Code</Heading>
          <Text style={textStyle}>
            Hello, {username}! <br />
            Use the following One-Time Password (OTP) to complete your action:
          </Text>
          <div style={otpStyle}>{otp}</div>
          <Text style={textStyle}>
            If you didn't request this, please ignore this email.
          </Text>
          <Button href="#" style={buttonStyle}>
            Use OTP
          </Button>
        </Container>
        <Text style={footerStyle}>&copy; {new Date().getFullYear()} Your Company. All rights reserved.</Text>
      </Body>
    </Html>
  );
};

const mainStyle = {
  backgroundColor: '#f4f4f4',
  fontFamily: 'Arial, sans-serif',
  padding: '20px',
};

const containerStyle = {
  maxWidth: '600px',
  margin: '0 auto',
  backgroundColor: '#ffffff',
  padding: '20px',
  borderRadius: '8px',
  boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
};

const headingStyle = {
  fontSize: '24px',
  color: '#333',
  marginBottom: '10px',
};

const textStyle = {
  color: '#555',
  lineHeight: '1.6',
  fontSize: '16px',
};

const otpStyle = {
  fontSize: '32px',
  fontWeight: 'bold',
  textAlign: 'center',
  margin: '20px 0',
  color: '#007BFF',
};

const buttonStyle = {
  display: 'block',
  textAlign: 'center',
  backgroundColor: '#007BFF',
  color: 'white',
  padding: '10px 20px',
  textDecoration: 'none',
  borderRadius: '5px',
  margin: '20px auto',
};

const footerStyle = {
  textAlign: 'center',
  fontSize: '12px',
  color: '#aaa',
  marginTop: '20px',
};
