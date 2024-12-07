resource "huaweicloud_vpc_subnet" "subnet1" {
name       = "subnet-web"
cidr       = "192.168.10.0/24"
gateway_ip = "192.168.10.1"
vpc_id     = huaweicloud_vpc.vpc_1.id
}


resource "huaweicloud_vpc_subnet" "public_subnet" {
  name       = "public-subnet"
  cidr       = "192.168.1.0/24"
  gateway_ip = "192.168.1.1"
  vpc_id     = huaweicloud_vpc.vpc_1.id
}

# Private Subnet
resource "huaweicloud_vpc_subnet" "private_subnet" {
  name       = "private-subnet"
  cidr       = "192.168.2.0/24"
  gateway_ip = "192.168.2.1"
  vpc_id     = huaweicloud_vpc.vpc_1.id
}
