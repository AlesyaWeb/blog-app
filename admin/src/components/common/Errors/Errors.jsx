import ValidationErrors from "./ValidationErros/ValidationErrors";
import ServerErrors from "./ServerErrors/ServerErrors";


const Errors = ({validationErrors, serverErrors}) => {
    return (
        <div>
            <ValidationErrors errors={validationErrors} />
            <ServerErrors errors={serverErrors} />
        </div>
    );
};

export default Errors;