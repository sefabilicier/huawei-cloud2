resource "huaweicloud_vpc_subnet" "mysubnet" {
  name       = "burak-subnet"
  cidr       = "172.16.10.0/24"
  gateway_ip = "172.16.10.1"
  vpc_id     = huaweicloud_vpc.vpc_4.id
  availability_zone = data.huaweicloud_availability_zones.testaz.names[0]

  
}




