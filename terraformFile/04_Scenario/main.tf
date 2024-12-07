variable "access_key" {
  description = "Access key for Huawei Cloud"
  type        = string
}

variable "secret_key" {
  description = "Secret key for Huawei Cloud"
  type        = string
}


terraform {
  required_providers {
    huaweicloud = {
      source = "huaweicloud/huaweicloud"
      version = ">= 1.27.0"
    }
  }
}

provider "huaweicloud" {
  auth_url   = "https://iam.ap-southeast-3.myhuaweicloud.com/v3"
  region     = "ap-southeast-1"
  access_key = var.access_key
  secret_key = var.secret_key
}

