from setuptools import find_packages, setup

setup(
    name='netbox-network-diagram',
    version='0.1',
    description='A plugin to render network diagram in NetBox.',
    install_requires=[],
    packages=find_packages(),
    include_package_data=True,
    zip_safe=False,
)
