# Creating VPC (Virtual Private Cloud) 
resource "huaweicloud_vpc" "vpc_1" {
  name = "sefa_vpc"
  cidr = "192.168.0.0/16"
}


data "huaweicloud_networking_secgroup" "mysecgroup" {
  name = "default"
}