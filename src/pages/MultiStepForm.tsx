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
    const { register, handleSubmit,getValues,trigger,formState: { errors } } = useForm<FormData>();

    const onSubmit: SubmitHandler<FormData> = (data) => {
        console.log(data);

    }
    const nextStep = async(s: number) => {
        
        let valid=false;

        if(s===1){
            valid=await trigger("location");
            console.log("اعتبارسنجی مرحله 1:", valid);
        }
        if(valid){
           // setComplete()
            setStep(s + 1);
        }else{
            alert("لطفاً فیلدهای این مرحله را کامل و صحیح پر کنید.");
        }
       
       // const values = getValues();
//console.log(values);  
    }
    const prevStep = (s: number) => {
        setStep(s - 1);
    }
    /* const nextStep = () => {
         setStep((prev) => prev + 1);
       };*/

    return (
        <div className='container0'>


            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="step-wrapper">

                    <div className='step-container'
                        onClick={() => setStep(1)}
                        style={{ color: step === 1 ? "#3498db" : "#ccc" }}
                    >
                        <div className='step-style'
                            style={{ background: step === 1 ? "#3498db" : "#ccc", borderColor: step === 1 ? "#3498db" : "#ccc" }}
                        >1</div>
                        <span>Job Location</span>
                    </div>
                    <div className='step-container'
                        onClick={() => setStep(2)}
                        style={{ color: step === 2 ? "#3498db" : "#ccc" }}
                    >
                        <div className='step-style'
                            style={{ background: step === 2 ? "#3498db" : "#ccc", borderColor: step === 2 ? "#3498db" : "#ccc" }}

                        >2</div>
                        <span>Job Positon</span>
                    </div>
                    <div className='step-container' onClick={() => setStep(3)} style={{ color: step === 3 ? "#3498db" : "#ccc" }}>
                        <div className='step-style' style={{ background: step === 3 ? "#3498db" : "#ccc", borderColor: step === 3 ? "#3498db" : "#ccc" }}
                        >3</div>
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
                        {errors.location && <p>{errors.location.message}</p>}
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
                        {errors.roles && <p>{errors.roles.message}</p>}
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
                        {errors.name && <p>{errors.name.message}</p>}
                        <input
                            type="text"
                            placeholder='Phone...'
                            {...register("phone", { required: "Phone Is Required!" })}
                        />
                        {errors.phone && <p>{errors.phone.message}</p>}
                        <input
                            type="text"
                            placeholder='Certification...'
                            {...register("certification", { required: "Certification Is Required!" })}
                        />
                        {errors.certification && <p>{errors.certification.message}</p>}

                        <button type='button' className="btn btn-primary" onClick={() => prevStep(3)}>Prev Step</button>

                        <button type='submit' className="btn btn-danger">Send</button>
                    </div>
                )}
            </form>
        </div>
    )
}
