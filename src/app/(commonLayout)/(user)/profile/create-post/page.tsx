'use client'
import FXInput from '@/src/components/Form/FXInput';
import { Button } from '@nextui-org/button';
import { Divider } from '@nextui-org/divider';
import React from 'react';
import { FieldValues, FormProvider, SubmitHandler, useFieldArray, useForm } from 'react-hook-form';

const CreatePost = () => {
    const methods = useForm()
    const {control, handleSubmit} = methods;

    const {fields, append, remove} = useFieldArray({
        control, name: 'questions'
    });

    const handleFieldAppend = () =>{
        append({name: "questions"})
    }

    const onSubmit: SubmitHandler<FieldValues> = (data) =>{
        console.log(data)
    } 
    return (
      <div>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <FXInput name="title" label="Title" required />

            <Divider />

            <div className="flex justify-between items-center">
              <h1 className="text-xl">Owner verification questions</h1>
              <Button onClick={() => handleFieldAppend()}>Append</Button>
            </div>
            
            {
                fields.map((field, index) => (
                    <div key={field.id} className='flex items-center space-x-3'>
                        <FXInput name={`questions.${index}.value`} label='Question'/>
                        <Button onClick={()=> remove(index)}>Remove</Button>
                    </div>
                ))
            }

            <Divider />

            <Button type="submit">Post</Button>
          </form>
        </FormProvider>
      </div>
    );
};

export default CreatePost;