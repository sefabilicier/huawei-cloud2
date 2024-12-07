resource "huaweicloud_vpc" "vpc_5a" {
  name = "my_custom_vpc5a"
  cidr = "10.0.0.0/16"
} 

output "subnet_ipv4_cidr" {
  value = huaweicloud_vpc_subnet.subnet5a.cidr
}