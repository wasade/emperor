#!/usr/bin/env python

from distutils.core import setup
from glob import glob

__author__ = "Yoshiki Vazquez Baeza"
__copyright__ = "Copyright 2013, The Emperor Project"
__credits__ = ["Antonio Gonzalez Pena", "Meg Pirrung", "Yoshiki Vazquez Baeza",
               "Jose Antonio Navas Molina", "Greg Caporaso"]
__license__ = "BSD"
__version__ = "0.9.51-dev"
__maintainer__ = "Yoshiki Vazquez Baeza"
__email__ = "yoshiki89@gmail.com"
__status__ = "Development"

# based on the text found in github.com/qiime/pynast
classes = """
    Development Status :: 4 - Beta
    License :: OSI Approved :: BSD License
    Topic :: Software Development :: Libraries :: Application Frameworks
    Topic :: Software Development :: User Interfaces
    Programming Language :: Python
    Programming Language :: Python :: 2.7
    Programming Language :: Python :: Implementation :: CPython
    Operating System :: OS Independent
    Operating System :: POSIX
    Operating System :: MacOS :: MacOS X
"""

classifiers = [s.strip() for s in classes.split('\n') if s]

long_description = """Emperor: a tool for visualizing high-throughput microbial community data

EMPeror: a tool for visualizing high-throughput microbial community data.
Vazquez-Baeza Y, Pirrung M, Gonzalez A, Knight R.
Gigascience. 2013 Nov 26;2(1):16.
"""

setup(
    name='emperor',
    version=__version__,
    description='Emperor',
    author="Antonio Gonzalez Pena, Meg Pirrung & Yoshiki Vazquez Baeza",
    author_email=__email__,
    maintainer=__maintainer__,
    maintainer_email=__email__,
    url='http://github.com/biocore/emperor',
    packages=['emperor', 'emperor/qiime_backports'],
    scripts=glob('scripts/*py'),
    package_data={
        'emperor': ['support_files/vendor/js/three.js-plugins/*.js',
                    'support_files/vendor/js/*.js',
                    'support_files/vendor/css/*.css',
                    'support_files/vendor/css/*.png',
                    'support_files/vendor/css/images/*.png',
                    'support_files/img/*.png',
                    'support_files/img/*.ico',
                    'support_files/css/*.css',
                    'support_files/js/*.js']},
    data_files={},
    install_requires=["numpy >= 1.7", "qcli",
                      "scikit-bio >= 0.2.1, < 0.3.0"],
    extras_require={'doc': ["Sphinx >= 1.2.2", "sphinx-bootstrap-theme"]},
    long_description=long_description,
    classifiers=classifiers)
