resource "huaweicloud_nat_gateway" "nat_gateway" {
  name   = "default-nat-gateway"
  vpc_id = huaweicloud_vpc.vpc_1.id
  subnet_id = huaweicloud_vpc_subnet.subnet1.id
  spec   = "2" # NAT Gateway performans seviyesi (1 genellikle temel seviye içindir)
}