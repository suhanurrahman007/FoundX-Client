'use client'
import { AddIcon, TrashIcon } from '@/src/assets/icons';
import FXDate from '@/src/components/Form/FXDate';
import FXInput from '@/src/components/Form/FXInput';
import FXSelect from '@/src/components/Form/FXSelect';
import { useGetCategories } from '@/src/hooks/categories';
import dateToISo from '@/src/utils/dateToISo';
import { allDistict } from '@bangladeshi/bangladesh-address';
import { Button } from '@nextui-org/button';
import { Divider } from '@nextui-org/divider';
import React from 'react';
import { FieldValues, FormProvider, SubmitHandler, useFieldArray, useForm } from 'react-hook-form';

const cityOptions = allDistict().sort().map((city: string) =>{
  return{
    key: city,
    label: city,
  }
})

const CreatePost = () => {
    const methods = useForm()
    const {control, handleSubmit} = methods;

    const {fields, append, remove} = useFieldArray({
        control, name: 'questions'
    });

    const handleFieldAppend = () =>{
        append({name: "questions"})
    }


    const {
      data: categoriesData,
      isLoading: categoryLoading,
      isSuccess: categorySuccess,
    } = useGetCategories();

    let categoryOption: { key: string; label: string }[] = [];

    if (categoriesData?.data && !categoryLoading) {
      categoryOption = categoriesData.data
        .sort()
        .map((category: { _id: string; name: string }) => ({
          key: category._id,
          label: category.name,
        }));
    }

    const onSubmit: SubmitHandler<FieldValues> = (data) =>{
        const postData = {
          ...data,
          dateFound: dateToISo(data?.dateFound)
        }

        console.log(postData)
    } 
    return (
      <>
        <div className="h-full rounded-xl bg-gradient-to-b from-default-100 px-[73px] py-12">
          <h1 className="text-2xl font-semibold">Post a found item</h1>
          <Divider className="mb-5 mt-3" />
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-wrap gap-2 py-2">
                <div className="min-w-fit flex-1">
                  <FXInput label="Title" name="title" />
                </div>
                <div className="min-w-fit flex-1">
                  <FXDate label="Found date" name="dateFound" />
                </div>
              </div>
              <div className="flex flex-wrap gap-2 py-2">
                <div className="min-w-fit flex-1">
                  <FXInput label="Location" name="location" />
                </div>
                <div className="min-w-fit flex-1">
                  <FXSelect label="City" name="city" options={cityOptions} />
                </div>
              </div>
              <div className="flex flex-wrap gap-2 py-2">
                <div className="min-w-fit flex-1">
                  <FXSelect
                    disabled={!categorySuccess}
                    label="Category"
                    name="category"
                    options={categoryOption}
                  />
                </div>
                <div className="min-w-fit flex-1">
                  <label
                    className="flex h-14 w-full cursor-pointer items-center justify-center rounded-xl border-2 border-default-200 text-default-500 shadow-sm transition-all duration-100 hover:border-default-400"
                    htmlFor="image"
                  >
                    Upload image
                  </label>
                  <input multiple className="hidden" id="image" type="file" />
                </div>
              </div>
              <div className="flex flex-wrap-reverse gap-2 py-2">
                <div className="min-w-fit flex-1">
                  {/* <FXTextarea label="Description" name="description" /> */}
                </div>
              </div>

              <Divider className="my-5" />

              <div className="flex justify-between items-center mb-5">
                <h1 className="text-xl">Owner verification questions</h1>
                <Button isIconOnly onClick={() => handleFieldAppend()}>
                  <AddIcon />
                </Button>
              </div>

              <div className="space-y-5">
                {fields.map((field, index) => (
                  <div key={field.id} className="flex gap-2 items-center">
                    <FXInput
                      label="Question"
                      name={`questions.${index}.value`}
                    />
                    <Button
                      isIconOnly
                      className="h-14 w-16"
                      onClick={() => remove(index)}
                    >
                      <TrashIcon />
                    </Button>
                  </div>
                ))}
              </div>

              <Divider className="my-5" />
              <div className="flex justify-end">
                <Button size="lg" type="submit">
                  Post
                </Button>
              </div>
            </form>
          </FormProvider>
        </div>
      </>
    );
};

export default CreatePost;