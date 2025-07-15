import React, { useState } from 'react'
import { useForm, type SubmitHandler } from 'react-hook-form'
type FormData = {
    location: string;
    roles: string;
    name: string;
    phone: string;
    certification: string

}
export default function MultiStepForm() {

    const [step, setStep] = useState(1);
    const [complete, setComplete] = useState<{ [key: number]: boolean }>({});
    const { register, handleSubmit, getValues, trigger, formState: { errors } } = useForm<FormData>();

    const onSubmit: SubmitHandler<FormData> = (data) => {
        console.log(data);
        setComplete(prev => ({ ...prev, [3]: true })); 
        setStep(4); 
    }
    const nextStep = async (s: number) => {

        let valid = false;

        if (s === 1) {
            valid = await trigger("location");
            console.log("validation step1:", valid);
        } else if (s === 2) {
            valid = await trigger("roles");
            console.log("validation step2:", valid);
        }
        /*else if (s === 3) {
            const isNameValid = await trigger("name");
            const isPhoneValid = await trigger("phone");
            valid = isNameValid && isPhoneValid;
            console.log("validation step3:", valid);
        }*/
        if (valid) {
            setComplete(prev => ({ ...prev, [s]: true }));
            //setStep((prev) => prev + 1);
            setStep(s + 1);
            console.log(complete);
        } else {
            //  alert("لطفاً فیلدهای این مرحله را کامل و صحیح پر کنید.");
        }

        // const values = getValues();
        //console.log(values);  
    }
    const prevStep = (s: number) => {
        setComplete(prev => ({ ...prev, [s]: false })); 
        setStep(s - 1);
        console.log(complete);
    }


    return (
        <div className='container0'>


            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="step-wrapper">

                    <div className='step-container'
                        /*  onClick={() => setStep(1)} */
                        style={{ color: step === 1 ? "#3498db" : complete[1] ? "#000" : "#ccc" }}
                    >
                        <div className='step-style'
                            style={{
                                background: step === 1 ? "#3498db" : complete[1] ? "green" : "#ccc",
                                borderColor: step === 1 ? "#3498db" : complete[1] ? "green" : "#ccc"
                            }}
                        >{complete[1] ? "✓" : 1}
                        </div>
                        <span>Job Location</span>
                    </div>
                    <div className='step-container'
                        /*  onClick={() => setStep(2)} */
                        style={{ color: step === 2 ? "#3498db" : complete[2] ? "#000" : "#ccc" }}
                    >
                        <div className='step-style'
                            style={{
                                background: step === 2 ? "#3498db" : complete[2] ? "green" : "#ccc",
                                borderColor: step === 2 ? "#3498db" : complete[2] ? "green" : "#ccc"
                            }}
                        >{complete[2] ? "✓" : 2}
                        </div>
                        <span>Job Positon</span>
                    </div>
                    <div className='step-container' /* onClick={() => setStep(3)} */
                        style={{ color: step === 3 ? "#3498db" : complete[3] ? "#000" : "#ccc" }}
                    >
                        <div className='step-style'
                            style={{
                                background: step === 3 ? "#3498db" : complete[3] ? "green" : "#ccc",
                                borderColor: step === 3 ? "#3498db" : complete[3] ? "green" : "#ccc"
                            }}
                        >{complete[3] ? "✓" : 3}
                        </div>
                        <span>Personal Details</span>
                    </div>

                </div>
                {step === 1 && (
                    <div>
                        <input
                            type="text"
                            placeholder='City,Area...'
                            {...register("location", { required: "Location Is Required!" })}
                        />
                        {errors.location && <p className="error-text">{errors.location.message}</p>}
                        <button type='button' className="btn btn-primary" onClick={() => nextStep(1)}>Next Step</button>
                    </div>
                )}
                {step === 2 && (
                    <div>
                        <input
                            type="text"
                            placeholder='Job title,Position...'
                            {...register("roles", { required: "Roles Is Required!" })}
                        />
                        {errors.roles && <p className="error-text">{errors.roles.message}</p>}
                        <button type='button' className="btn btn-primary" onClick={() => nextStep(2)}>Next Step</button>
                        <button type='button' className="btn btn-secondary" onClick={() => prevStep(2)}>Prev Step</button>

                    </div>
                )}
                {step === 3 && (
                    <div>
                        <input
                            type="text"
                            placeholder='Name...'
                            {...register("name", { required: "Name Is Required!" })}
                        />
                        {errors.name && <p className="error-text">{errors.name.message}</p>}
                        <input
                            type="text"
                            placeholder='Phone...'
                            {...register("phone", { required: "Phone Is Required!" })}
                        />
                        {errors.phone && <p className="error-text">{errors.phone.message}</p>}
                        <input
                            type="text"
                            placeholder='Certification...'
                            {...register("certification", { required: "Certification Is Required!" })}
                        />
                        {errors.certification && <p className="error-text">{errors.certification.message}</p>}

                        <button type='button' className="btn btn-primary" onClick={() => prevStep(3)}>Prev Step</button>

                        <button type='submit' className="btn btn-danger" >Send</button>
                    </div>
                )}
                {step === 4 && (
                    <div>Success!!</div>
                )}
            </form>
        </div>
    )
}
