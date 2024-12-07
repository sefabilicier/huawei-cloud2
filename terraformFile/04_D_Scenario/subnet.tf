resource "huaweicloud_vpc_subnet" "example_subnet" {
  name       = "example_subnet"
  cidr       = "172.16.10.0/24"
  gateway_ip = "172.16.10.1"
  vpc_id     = huaweicloud_vpc.example_vpc.id
}
