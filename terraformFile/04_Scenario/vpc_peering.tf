resource "huaweicloud_vpc_peering_connection" "peering" {
  name        = "my_peer"
  vpc_id      = huaweicloud_vpc.vpc_4.id
  peer_vpc_id = huaweicloud_vpc.peer_vpc.id
}

resource "huaweicloud_vpc_route" "vpc_route" {
  type        = "peering"
  nexthop     = huaweicloud_vpc_peering_connection.peering.id
  destination = "192.168.0.0/16"
  vpc_id      = huaweicloud_vpc.vpc_4.id
}
