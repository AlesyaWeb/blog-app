import React from "react";

const Errors = ({errors, authErrors}) => {
    const authErrorsMessages = authErrors?.map((error, key) => {
        return <div key={key}>
            <span className="password__errors-icon"><span>!</span></span>
            <div>{error.message}</div>
        </div>
    })
    return (
        <div className="register__errors">
            <div className="email__errors">
                {errors?.login?.message &&
                    <>
                        <span className="email__errors-icon"><span>!</span></span>
                        <div>{errors.login.message}</div>
                    </>
                }
            </div>
            <div className="password__errors">
                {errors?.password?.message &&
                    <>
                        <span className="password__errors-icon"><span>!</span></span>
                        <div>{errors.password.message}</div>
                    </>
                }
            </div>
            <div className={"auth__errors"}>
                {
                    authErrorsMessages
                }
            </div>
        </div>
    )
}

export default Errors