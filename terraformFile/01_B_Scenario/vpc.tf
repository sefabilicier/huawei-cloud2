# Creating VPC (Virtual Private Cloud) 
resource "huaweicloud_vpc" "vpc_1" {
  name        = "example-vpc"
  cidr        = "10.0.0.0/16"
  description = "Example VPC"
}