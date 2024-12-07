resource "huaweicloud_nat_gateway" "nat_gateway_5b" {
  name        = "nat-gateway-basic"
  description = "test for terraform examples"
  spec        = "1"
  vpc_id      = huaweicloud_vpc.vpc_5b.id
  subnet_id   = huaweicloud_vpc_subnet.subnet_5b.id
}

resource "huaweicloud_nat_snat_rule" "snat_rule_5" {
  floating_ip_id = huaweicloud_vpc_eip.eip_5.id
  nat_gateway_id = huaweicloud_nat_gateway.nat_gateway_5b.id
  subnet_id      = huaweicloud_vpc_subnet.subnet_5b.id
}
