resource "huaweicloud_vpc_subnet" "low_subnet" {
  name             = "low-subnet"
  cidr             = "172.16.10.0/24"
  gateway_ip       = "172.16.10.1"
  vpc_id           = huaweicloud_vpc.low_vpc.id
  availability_zone = data.huaweicloud_availability_zones.low_az.names[0]
}
