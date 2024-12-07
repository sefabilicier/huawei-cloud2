resource "huaweicloud_nat_gateway" "nat_5" {
  name        = "nat-gateway-basic"
  description = "test for terraform examples"
  spec        = "1"
  vpc_id      = huaweicloud_vpc.vpc_5.id
  subnet_id   = data.huaweicloud_vpc_subnet.subnet_5.id
}
resource "huaweicloud_nat_snat_rule" "snat_5" {
  floating_ip_id = huaweicloud_vpc_eip.eip_5.id
  nat_gateway_id = huaweicloud_nat_gateway.nat_5.id
  subnet_id      = data.huaweicloud_vpc_subnet.subnet_5.id
}

/* data "huaweicloud_vpc" "vpc_5" {
  name = "kubra_vpc"
} that is not needed anymore*/

data "huaweicloud_vpc_subnet" "subnet_5" {
  name = "subnet-web"
  vpc_id = huaweicloud_vpc.vpc_5.id
}