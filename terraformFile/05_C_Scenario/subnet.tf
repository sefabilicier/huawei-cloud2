resource "huaweicloud_vpc_subnet" "subnet_5c" {
  name       = "subnet-web"
  cidr       = "10.0.0.0/24"
  gateway_ip = "10.0.0.1"
  vpc_id     = huaweicloud_vpc.vpc_5c.id

  timeouts {
    delete = "30m"
}
}
