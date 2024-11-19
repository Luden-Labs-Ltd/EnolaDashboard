"use client"
import PhoneField from "@components/PhoneField";
import Row from "@components/Row";
import { Button } from "@components/shadowCDN/button";
import { Input } from "@components/shadowCDN/input";
import React from "react";

type ResourceFormProps = {
  onSubmit: () => void;
};
export const ResourceForm: React.FC<ResourceFormProps> = ({ onSubmit }) => {
  return (
    <div className="flex flex-col gap-[32px]">
      <Row alignItems="center" className="justify-center">
        <label className="whitespace-nowrap" htmlFor="service_name">
          Service Name
        </label>
        <Input id="service_name" />
      </Row>
      <Row alignItems="center" className="justify-center">
        <label className="whitespace-nowrap" htmlFor="organization">
          Organization
        </label>
        <Input id="organization" />
      </Row>
      <Row alignItems="center" className="justify-center">
        <label className="whitespace-nowrap" htmlFor="terms_of_service">
          Terms of Service
        </label>
        <Input id="terms_of_service" />
      </Row>
      <Row alignItems="center" className="justify-center">
        <label className="whitespace-nowrap" htmlFor="url">
          Contact information
        </label>
        <PhoneField name="contact_information"/>
      </Row>
      <Row alignItems="center" className="justify-center">
        <label className="whitespace-nowrap" htmlFor="url">
          URL
        </label>
        <Input id="url" placeholder="https://" />
      </Row>
      <Row alignItems="center" className="justify-center">
        <label className="whitespace-nowrap" htmlFor="category">
          Category
        </label>
        <select id="category" >
          <option>Select category</option>
          <option>category 2</option>
          <option>category 3</option>
        </select>
      </Row>
      <div className="flex justify-center">
        <Button rounded={"circle"} onClick={onSubmit} size={"lg"}>
          Add
        </Button>
      </div>
    </div>
  );
};
