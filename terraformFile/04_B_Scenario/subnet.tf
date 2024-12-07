resource "huaweicloud_vpc_subnet" "main_subnet" {
  name       = "main_subnet"
  cidr       = "172.16.1.0/24"
  gateway_ip = "172.16.1.1"
  vpc_id     = huaweicloud_vpc.main_vpc.id
}
