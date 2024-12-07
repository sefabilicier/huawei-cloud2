resource "huaweicloud_vpc_subnet" "subnet5" {
  name       = "subnet-web"
  cidr       = "192.168.10.0/24"
  gateway_ip = "192.168.10.1"
  vpc_id     = huaweicloud_vpc.vpc_5.id
}