import type { Component } from "vue";

declare module "vue" {
  export interface GlobalComponents {
    DPMGInputText: Component;
  }
}

export {};
