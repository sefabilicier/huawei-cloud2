resource "huaweicloud_nat_gateway" "nat_gateway_5" {
  name        = "nat-gateway-basic"
  description = "test for terraform examples"
  spec        = "1"
  vpc_id      = huaweicloud_vpc.vpc_5a.id
  subnet_id   = huaweicloud_vpc_subnet.subnet5a.id
}

resource "huaweicloud_nat_snat_rule" "snat_rule_5" {
  floating_ip_id = huaweicloud_vpc_eip.eip_5.id
  nat_gateway_id = huaweicloud_nat_gateway.nat_gateway_5.id
  subnet_id      = huaweicloud_vpc_subnet.subnet5a.id
}
