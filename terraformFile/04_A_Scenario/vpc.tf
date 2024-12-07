resource "huaweicloud_vpc" "low_vpc" {
  name = "low-vpc"
  cidr = "172.16.0.0/12"
}
