resource "huaweicloud_elb_loadbalancer" "application_elb" {
  name = "application-elb"
  vpc_id             = huaweicloud_vpc.vpc_5c.id

  availability_zone = ["ap-southeast-3a"]

  depends_on = [huaweicloud_vpc_subnet.subnet_5c]

  tags = {
    environment = "production"
  } 
}

resource "huaweicloud_elb_listener" "application_listener" {
  loadbalancer_id = huaweicloud_elb_loadbalancer.application_elb.id
  protocol        = "HTTP"  
  protocol_port =   80
}