# Creating VPC (Virtual Private Cloud) 
resource "huaweicloud_vpc" "vpc_5" {
  name = "kubra_vpc"
  cidr = "192.168.0.0/16"
}



