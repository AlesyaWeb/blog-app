import styles from './ContactsEditPage.module.scss'
import ContactsEditForm from "../../components/ContactsEditForm/ContactsEditForm";

const ContactsEditPage = () => {
    return (
        <div className={styles.contactsEditPage}>
             <h1 className={styles.contactsEditPage_title}>Edit contacts</h1>
            <ContactsEditForm />
        </div>
    );
};

export default ContactsEditPage;