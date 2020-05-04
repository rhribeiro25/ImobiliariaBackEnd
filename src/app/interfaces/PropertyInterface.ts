import { PropertyDetailsInterface } from "@interfaces/PropertyDetailsInterface";
import { AddressInterface } from "@interfaces/AddressInterface";
import { ImageInterface } from "@interfaces/ImageInterface";
import { PropertyCharacteristicsInterface } from "@interfaces/PropertyCharacteristicsInterface";
import { PropertyItensInterface } from "@interfaces/PropertyItensInterface";
import { PropertyFacilitiesInterface } from "@interfaces/PropertyFacilitiesInterface";
import { PropertyFurnitureInterface } from "@interfaces/PropertyFurnitureInterface";
import { PropertyHomeAppliancesInterface } from "@interfaces/PropertyHomeAppliancesInterface";
import { UserInterface } from "./UserInterface";
import { ContractInterface } from "./ContractInterface";
import { Document } from "mongoose";

export interface PropertyInterface extends Document {
  details: PropertyDetailsInterface;
  address: AddressInterface;
  images: [ImageInterface];
  characteristics: PropertyCharacteristicsInterface;
  itens: PropertyItensInterface;
  facilities: PropertyFacilitiesInterface;
  furniture: PropertyFurnitureInterface;
  homeAppliances: PropertyHomeAppliancesInterface;
  crBy: UserInterface;
  contract: ContractInterface;
};