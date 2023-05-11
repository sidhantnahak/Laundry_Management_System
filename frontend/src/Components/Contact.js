import React from 'react'
import './contact.css'

const Contact = () => {
    return (
        <div className='contact_container'>



            <section id="contact">
                <h1 className="h-primary center">Contact Us</h1>
                <div id="contact-box">
                    <form action="">
                        <div className="form-group">
                            <label for="name">Name: </label>
                            <input type="text" name="name" id="name" placeholder="Enter your name" />
                        </div>
                        <div className="form-group">
                            <label for="email">Email: </label>
                            <input type="email" name="name" id="email" placeholder="Enter your email" />
                        </div>
                        <div className="form-group">
                            <label for="phone">Phone Number: </label>
                            <input type="phone" name="name" id="phone" placeholder="Enter your phone" />
                        </div>
                        <div className="form-group">
                            <label for="message">Message: </label>
                            <textarea name="message" id="message" cols="30" rows="10"></textarea>
                        </div>
                        <button className='submit_button'>Submit</button>

                    </form>

                </div>

            </section>

        </div>
    )
}

export default Contact