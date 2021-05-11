+++
Category = "Autoencoder"
Author = "Julius"
+++


# Papers
https://arxiv.org/pdf/2101.03958.pdf

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.


## Extra Info
Hi

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

### Even more extra info!
Bruhhhh

#### SUPER BRUHH
YES

# Theory
$$ r = \text{dec}(\text{enc}(x)))$$

# Code
```py
class Encoder(nn.Module):
    def __init__(self, latent_dim, bnorm=True, affine=True):
        super().__init__()
        self.conv1 = nn.Conv2d(1, 32, 4, 2, 1)
        self.conv2 = nn.Conv2d(32, 1, 4, 2, 1)
        self.l1 = nn.Linear(49, latent_dim)
        self.bnorm_l = (
            nn.BatchNorm1d(latent_dim, affine=affine) if bnorm else nn.Identity()
        )

    def forward(self, x):
        x = F.elu(self.conv1(x))
        x = F.elu(self.conv2(x))
        x = self.l1(x.reshape(-1, 49))
        x = self.bnorm_l(x)
        return x


class Decoder(nn.Module):
    def __init__(self, latent_dim):
        super().__init__()
        self.l1 = nn.Linear(latent_dim, 49)
        self.conv1 = nn.ConvTranspose2d(1, 32, 4, 2, 1)
        self.conv2 = nn.ConvTranspose2d(32, 1, 4, 2, 1)

    def forward(self, x):
        x = self.l1(x)
        x = F.elu(self.conv1(x.reshape(-1, 1, 7, 7)))
        x = F.elu(self.conv2(x))
        return x


class AutoEncoder(nn.Module):
    def __init__(
        self, latent_dim: int, bnorm: bool, affine: bool, lr: float, name: AnyStr
    ):
        super().__init__()
        self._encoder = Encoder(latent_dim, bnorm, affine)
        self._decoder = Decoder(latent_dim)
        self.opt = optim.Adam(self.parameters(), lr=lr)
        self.name = name

    def forward(self, x):
        x = self._encoder(x)
        x = self._decoder(x)
        return x

    def encode(self, x) -> torch.Tensor:
        return self._encoder(x)

    def decode(self, x) -> torch.Tensor:
        return self._decoder(x)
```

# Some Bruhs Don't Get It
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.