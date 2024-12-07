resource "huaweicloud_vpc" "vpc_1" {
  name        = "my-new-vpc-unique"
  cidr        = "10.0.0.0/16"
  description = "Updated VPC with unique name to avoid conflicts"
}
