# Creating VPC (Virtual Private Cloud) 
resource "huaweicloud_vpc" "vpc_1" {
  name = "sefa_vpc"
  cidr = "192.168.0.0/16"
}


data "huaweicloud_networking_secgroup" "mysecgroup" {
  name = "default"
}

/* resource "huaweicloud_networking_secgroup_rule" "secgroup_rule" {
  direction         = "ingress"
  ethertype         = "IPv4"
  protocol          = "tcp"
  port_range_min    = 22
  port_range_max    = 22
  remote_ip_prefix  = "0.0.0.0/0"
  security_group_id = data.huaweicloud_networking_secgroup.mysecgroup.id
}

 */

/* resource "huaweicloud_networking_secgroup_rule" "allow_ssh" {
  direction       = "ingress"
  ethertype       = "IPv4"
  protocol        = "tcp"
  port_range_min  = 22
  port_range_max  = 22
  remote_ip_prefix = "0.0.0.0/0"
  security_group_id = data.huaweicloud_networking_secgroup.mysecgroup.id

  lifecycle {
    ignore_changes = [security_group_id]
  }
}


resource "huaweicloud_networking_secgroup_rule" "allow_http" {
  direction        = "ingress"
  ethertype        = "IPv4"
  protocol         = "tcp"
  port_range_min   = 80
  port_range_max   = 80
  remote_ip_prefix = "0.0.0.0/0"
  security_group_id = data.huaweicloud_networking_secgroup.mysecgroup.id
} */



resource "huaweicloud_networking_secgroup_rule" "ecs_to_rds" {
  direction        = "ingress"
  ethertype        = "IPv4"
  protocol         = "tcp"
  port_range_min   = 5432
  port_range_max   = 5432
  remote_ip_prefix = huaweicloud_vpc_subnet.subnet1.cidr
  security_group_id = data.huaweicloud_networking_secgroup.mysecgroup.id
}

data "huaweicloud_networking_secgroup_rules" "existing_rules" {
  security_group_id = data.huaweicloud_networking_secgroup.mysecgroup.id
}
