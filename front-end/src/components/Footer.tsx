import React from 'react';
import emailjs from 'emailjs-com';
import { Form, Input, Button, message, Row, Col } from 'antd';
import {InstagramOutlined, LinkedinOutlined, GlobalOutlined, GithubOutlined } from '@ant-design/icons';
import './Footer.css';

const ContactForm: React.FC = () => {
    const [form] = Form.useForm();

    const handleSendEmail = async (values: any) => {
        try {
            await emailjs.send(
                "service_x53hdzs",
                "template_l35qfws",
                form.getFieldsValue(),
                "R_X_nIM0UFsKoJUKP"
            );
            message.success('Email sent successfully!');
            form.resetFields();
        } catch (error) {
            console.error(error);
            message.error('Failed to send email. Please try again later.');
        }
    };

    return (
        <div className="footer">
            <Row justify="space-between" className="footer-content">
                {/* Contact Information and Social Links */}
                <Col xs={24} sm={12} lg={8} className="footer-info">
                    <h3>About Me</h3>
                    <p>Designed and Developed by <strong>Preeti Dudi</strong></p>
                    <div className="footer-icons">
                        <a href="https://github.com/preeti-dudi" target="_blank" rel="noopener noreferrer"><GithubOutlined /></a>
                        <a href="https://instagram.com/dudi.01.preeti" target="_blank" rel="noopener noreferrer"><InstagramOutlined /></a>
                        <a href="https://linkedin.com/in/preeti-dudi/" target="_blank" rel="noopener noreferrer"><LinkedinOutlined /></a>
                        <a href="https://preeti-dudi.github.io"><GlobalOutlined /></a>
                    </div>
                </Col>

                {/* Contact Form */}
                <Col xs={24} sm={12} lg={16} className="contact-form">
                    <h3>Contact Preeti</h3>
                    <Form
                        form={form}
                        layout="vertical"
                        onFinish={handleSendEmail}
                    >
                        <Form.Item
                            label="Your Name"
                            name="from_name"
                            rules={[{ required: true, message: 'Please enter your name!' }]}
                        >
                            <Input placeholder="Enter your name" />
                        </Form.Item>

                        <Form.Item
                            label="Your Email"
                            name="from_email"
                            rules={[
                                { required: true, message: 'Please enter your email!' },
                                { type: 'email', message: 'Please enter a valid email!' }
                            ]}
                        >
                            <Input placeholder="Enter your email" />
                        </Form.Item>

                        <Form.Item
                            label="Your Message"
                            name="message"
                            rules={[{ required: true, message: 'Please enter your message!' }]}
                        >
                            <Input.TextArea placeholder="Enter your message" rows={4} />
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit" block>
                                Send Message
                            </Button>
                        </Form.Item>
                    </Form>
                </Col>
            </Row>
        </div>
    );
};

export default ContactForm;
