"use client"
import { useGroupSettingForm } from "@/hooks/group"
import React from "react"
import GroupCard from "@/app/(discover)/explore/_components/group-card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { FormGenerator } from "@/components/global/form-generator"
import { Button } from "@/components/ui/button"
import { Loader } from "@/components/loader"
import BlockTextEditor from "@/components/global/rich-text-editor"

type Props = {
    groupId: string
}

const GroupSettingForm = ({ groupId }: Props) => {
    const {
        data,
        register,
        errors,
        onSubmit,
        isPending,
        preview,
        thumbnail,
        jsonDesc,
        setJsonDesc,
        desc,
        setDesc,
    } = useGroupSettingForm({ groupId })
    return (
        <form
          className="flex flex-col h-full w-full items-start gap-y-5"
          onSubmit={onSubmit}
        >
          <div className="flex 2xl:flex-row flex-col gap-10">
            <div className="flex flex-col gap-3 items-start">
              <p>Group Preview</p>
              <GroupCard
                id={data?.groupInfo?.id!}
                createdAt={data?.groupInfo?.createdAt!}
                userId={data?.groupInfo?.userId!}
                category={data?.groupInfo?.category!}
                desc={data?.groupInfo?.description!}
                privacy={data?.groupInfo?.privacy!}
                thumbnail={data?.groupInfo?.thumbnail!}
                name={data?.groupInfo?.name!}
                previewThumbnail={preview}
              />
              <Label
                htmlFor="thumbnail-upload"
                className="border-2 border-themeGray bg-themeGray/50 px-5 py-3 rounded-lg hover:bg-themeBlack cursor-pointer"
              >
                <Input
                  type="file"
                  id="thumbnail-upload"
                  className="hidden"
                  {...register("thumbnail")}
                />
                Change Cover
              </Label>
            </div>
            <div className="flex-1 flex flex-col gap-3 items-start">
              <p className="">Icon Preview</p>
              <img
                className="w-20 h-20 rounded-xl"
                src={
                  preview ||
                  (data?.groupInfo?.icon &&
                    `https://ucarecdn.com/${data?.groupInfo?.icon}/`) ||
                  "https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg"
                }
                alt="icon"
              />
              <Label
                className="border-2 border-themeGray bg-themeGray/50 px-5 py-3 rounded-lg cursor-pointer hover:bg-themeBlack"
                htmlFor="icon-upload"
              >
                <Input
                  type="file"
                  id="icon-upload"
                  className="hidden"
                  {...register("icon")}
                />
                Change Icon
              </Label>
            </div>
          </div>
          <div className="flex flex-col w-full xl:w-8/12 2xl:w-7/12 gap-y-5">
            <FormGenerator
              register={register}
              name="name"
              placeholder={data?.groupInfo?.name!}
              label="Group Name"
              errors={errors}
              inputType="input"
              type="text"
            />
            <Label className="flex flex-col gap-y-2">
              <p>Group Description</p>
              <BlockTextEditor
                errors={errors}
                name="jsondescription"
                min={150}
                max={10000}
                textContent={desc}
                content={jsonDesc}
                setContent={setJsonDesc}
                setTextContent={setDesc}
              />
            </Label>
            <Button className="self-start" type="submit">
              <Loader loading={isPending}>Update Settings</Loader>
            </Button>
          </div>
        </form>
      )
    
}

export default GroupSettingForm
