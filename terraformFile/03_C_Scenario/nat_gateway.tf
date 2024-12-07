resource "huaweicloud_nat_gateway" "nat_gateway" {
  name   = "default-nat-gateway"
  vpc_id = huaweicloud_vpc.vpc_1.id
  subnet_id = huaweicloud_vpc_subnet.subnet1.id
  spec   = "3" # NAT Gateway performans seviyesi (3 yüksek seviye için)
}
