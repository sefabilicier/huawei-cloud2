# ELB Load Balancer
resource "huaweicloud_lb_loadbalancer" "lb_1" {
  name          = "my-loadbalancer"
  vip_subnet_id  = huaweicloud_vpc_subnet.subnet1.ipv4_subnet_id

  depends_on = [huaweicloud_vpc_subnet.subnet1]

  tags = {
    key = "value"
  }
}
# Listener
resource "huaweicloud_lb_listener" "http_listener" {
  name            = "http-listener"
  protocol        = "HTTP"
  protocol_port   = 80
  loadbalancer_id = huaweicloud_lb_loadbalancer.lb_1.id
}

# Backend Pool
resource "huaweicloud_lb_pool" "backend_pool" {
  name         = "backend-pool"
  protocol     = "HTTP"
  lb_method    = "ROUND_ROBIN"  # Load balancing method
  listener_id  = huaweicloud_lb_listener.http_listener.id
}

# Pool Members 
 resource "huaweicloud_lb_member" "backend_members" {
  count         = 2
  address       = huaweicloud_compute_instance.mycompute[count.index].access_ip_v4
  protocol_port = 80
  subnet_id     = huaweicloud_vpc_subnet.subnet1.ipv4_subnet_id
  pool_id       = huaweicloud_lb_pool.backend_pool.id  
}
