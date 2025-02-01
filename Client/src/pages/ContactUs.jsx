import './LogIn.css';
import NavBar from "../components/Header";
import Footer from "../components/Footer";

const ContactUs = () => {
    return (
 <> 
         <div className="contact-container">
            <form action="" className='contact-form'>
                <div className="form-group">
                    <span>Name</span>
                    <input type="text" placeholder='Vikas' />
                </div> 
                <div className="form-group">
                    <span>Email</span>
                    <input type="text" placeholder="example@email.com"/>
                    </div>
                <div className="form-group">
                    <span>Message</span>
                    <textarea name="" id="" cols="30" rows="10"></textarea>
                </div>
                <button>Submit</button>
                    </form>
        </div> 
 </>
    )
}
export default ContactUs;