resource "huaweicloud_nat_gateway" "nat_gateway_3" {
  name        = "nat-gateway-basic"
  description = "test for terraform examples"
  spec        = "1"
  vpc_id      = huaweicloud_vpc.vpc_3d.id
  subnet_id   = huaweicloud_vpc_subnet.subnet_3d.id
}

resource "huaweicloud_nat_snat_rule" "snat_rule_3" {
  floating_ip_id = huaweicloud_vpc_eip.eip_3.id
  nat_gateway_id = huaweicloud_nat_gateway.nat_gateway_3.id
  subnet_id      = huaweicloud_vpc_subnet.subnet_3d.id
}
